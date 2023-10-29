using k8s;
using k8s.Models;
using System;
using System.Threading.Tasks;

public class KubernetesService
{
    private IKubernetes _client;

    public KubernetesService()
    {
        // Initialize Kubernetes client
        var config = KubernetesClientConfiguration.BuildConfigFromConfigFile("./kubeconfig.txt");
        _client = new Kubernetes(config);
    }

    public async Task<bool> DeployApplication(string deploymentName, string containerName, string containerImage, int replicas, int port)
    {
        await CreateService(deploymentName, port);
        try
        {
            var deployment = new V1Deployment
            {
                Metadata = new V1ObjectMeta { Name = deploymentName },
                Spec = new V1DeploymentSpec
                {
                    Replicas = replicas,
                    Selector = new V1LabelSelector { MatchLabels = new Dictionary<string, string> { { "app", deploymentName } } },
                    Template = new V1PodTemplateSpec
                    {
                        Metadata = new V1ObjectMeta { Labels = new Dictionary<string, string> { { "app", deploymentName } } },
                        Spec = new V1PodSpec
                        {
                            Containers = new List<V1Container>
                            {
                                new V1Container
                                {
                                    Name = containerName,
                                    Image = containerImage,
                                    ImagePullPolicy = "Always",
                                    Ports = new List<V1ContainerPort>
                                    {
                                        new V1ContainerPort
                                        {
                                            ContainerPort = port
                                        }
                                    }
                                    // Add other container settings as needed (ports, environment variables, etc.)
                                }
                            }
                        }
                    }
                }
            };

            var result = await _client.AppsV1.CreateNamespacedDeploymentWithHttpMessagesAsync(deployment, "frontend");

            if (result != null)
            {
                Console.WriteLine($"Deployment '{deploymentName}' with container '{containerName}' deployed successfully.");
                await CreateIngress(deploymentName, port);
                return true;
            }

            Console.WriteLine($"Failed to deploy application '{deploymentName}' with container '{containerName}'.");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to deploy application: {ex.Message}");
            return false;
        }
    }
    
    public async Task<bool> CreateService(string serviceName, int port)
    {
        try
        {
            var service = new V1Service
            {
                Metadata = new V1ObjectMeta { Name = serviceName },
                Spec = new V1ServiceSpec
                {
                    Selector = new Dictionary<string, string> { { "app", serviceName } },
                    Ports = new List<V1ServicePort>
                    {
                        new V1ServicePort
                        {
                            Port = port,
                            TargetPort = port,
                            Protocol = "TCP"
                        }
                    },
                    Type = "ClusterIP",
                }
            };

            var result = await _client.CoreV1.CreateNamespacedServiceWithHttpMessagesAsync(service, "frontend");

            if (result != null)
            {
                Console.WriteLine($"Service '{serviceName}' created successfully.");
                return true;
            }

            Console.WriteLine($"Failed to create service '{serviceName}'.");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to create service: {ex.Message}");
            return false;
        }
    }
    
    public async Task<bool> CreateIngress(string ingressName, int port)
    {
        try
        {
            var ingress = new V1Ingress()
            {
                Metadata = new V1ObjectMeta { Name = ingressName, Annotations = new Dictionary<string, string>{{"kubernetes.io/ingress.class", "nginx"}}},
                Status = new V1IngressStatus
                {
                    LoadBalancer = new V1IngressLoadBalancerStatus
                    {
                        Ingress = new List<V1IngressLoadBalancerIngress>
                        {
                            new V1IngressLoadBalancerIngress
                            {
                                Ip = "80.211.122.239"
                            }
                        }
                    }
                },
                Spec = new V1IngressSpec
                {
                    Rules = new List<V1IngressRule>
                    {
                        new V1IngressRule
                        {
                            Http = new V1HTTPIngressRuleValue
                            {
                                Paths = new List<V1HTTPIngressPath>
                                {
                                    new V1HTTPIngressPath
                                    {
                                        Path = "/test",
                                        PathType = "Prefix",
                                        Backend = new V1IngressBackend
                                        {
                                            Service = new V1IngressServiceBackend
                                            {
                                                Name = ingressName,
                                                Port = new V1ServiceBackendPort
                                                {
                                                    Number = port
                                                }
                                            }
                                        }
                                    }
                                },
                                
                                
                            }
                        }
                    }
                }
            };

            var result = await _client.NetworkingV1.CreateNamespacedIngressWithHttpMessagesAsync(ingress, "frontend");

            if (result != null)
            {
                Console.WriteLine($"Ingress '{ingressName}' created successfully.");
                return true;
            }

            Console.WriteLine($"Failed to create ingress '{ingressName}'.");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to create ingress: {ex.Message}");
            return false;
        }
    }
}

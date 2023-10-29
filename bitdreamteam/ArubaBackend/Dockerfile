FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ArubaBackend/ArubaBackend.csproj", "ArubaBackend/"]
RUN dotnet restore "ArubaBackend/ArubaBackend.csproj"
COPY . .
WORKDIR "/src/ArubaBackend"
RUN dotnet build "ArubaBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ArubaBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY ArubaBackend/kubeconfig.txt .
ENTRYPOINT ["dotnet", "ArubaBackend.dll"]


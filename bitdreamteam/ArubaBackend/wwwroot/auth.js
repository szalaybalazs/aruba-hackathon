var BackEndSite = ""

function register1() {
  // Prevent the form from submitting the traditional way

    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var userRegisterDto = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        Id:""
    };

    fetch(BackEndSite+'/auth/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userRegisterDto)
    })
    .then(response => response.json())  // Assuming your API returns JSON
    .then(data => {
        if (data.errorMessage) {
            // Display error message
            document.getElementById('error-message').innerText = data.errorMessage;
        } else {
            // Registration was successful
            // Redirect to login page or display a success message
            //window.location.href = '/login.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').innerText = 'An error occurred. Please try again later.';
    });
};

function login1(){// Prevent the form from submitting the traditional way

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var LoginDto = {
        Email: email,
        Password: password
    };

    fetch(BackEndSite+'/auth/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(LoginDto)
    })
    .then(response => response.json())  // Assuming your API returns JSON
    .then(data => {
        if (data.errorMessage) {
            // Display error message
            document.getElementById('error-message').innerText = data.errorMessage;
        } else if (data.token) {
            // Login was successful
            // Store the token and redirect to the dashboard or a protected page
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('UserData', data.user);
            window.location.href = '/index.html';
            // getUserDetails(localStorage.getItem('authToken'));
        } else {
            // Unexpected response format
            console.error('Unexpected response:', data);
            document.getElementById('error-message').innerText = 'An error occurred. Please try again later.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').innerText = 'An error occurred. Please try again later.';
    });

    // getAuthToken().then(authToken => {
    //     getUserDetails(localStorage.getItem('authToken'));
    // });
};

// localStorage.getItem('authToken')
async function getUserDetails(authToken) {
    const url = BackEndSite + '/users/GetUserDetails';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log(data);

        // Save the entire user details object to local storage
        localStorage.setItem('userDetails', JSON.stringify(data));

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Usage:
// Assume authToken is defined
// getUserDetails(authToken);

document.getElementById('ProfilPictureUpload').addEventListener('change', function() {
    var fileInput = document.getElementById('ProfilPictureUpload');
    var file = fileInput.files[0];
    if (file) {
        var formData = new FormData();
        formData.append('userImage', file);

        var authToken = localStorage.getItem('authToken');  // Assuming the authToken is stored in local storage

        fetch('http://localhost:8069/users/UploadUserImage', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                // 'Content-Type' header is not needed when using FormData,
                // it will be set automatically to 'multipart/form-data' with the correct boundary
            },
            body: formData
        })
        .then(response => response.json())  // Assuming the server responds with JSON
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        console.error('No file selected');
    }
});


async function deployUserApp() {
    try {
      const authToken = localStorage.getItem('authToken');  // Assuming the authToken is stored in local storage
  
      if (!authToken) {
        throw new Error('Authorization token is not available');
      }
      
      const response = await fetch(BackEndSite+'/kubernetes/DeployUserApp', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + authToken,
        },
      });
  
      if (response.ok) {
        console.log('App deployed successfully');
      } else {
        const errorData = await response.json();  // Assuming the server responds with JSON in case of error
        console.error('Error:', errorData);
      }
  
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  

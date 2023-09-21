import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
  },
  error: function (request) {
    console.log(request);
  },
});

///////////////////////

export let createUser = function (
  username,
  email,
  password,
  successCB,
  errorCB
) {
  let request = {
    type: 'POST',
    url: 'api/users',
    data: {
      user: {
        username: username,
        email: email,
        password: password,
      },
    },
    success: function (data) {
      console.log('User created successfully:', data);
      if (typeof successCB === 'function') {
        successCB(data);
      }
    },
    error: function (xhr, status, error) {
      console.log('Error creating user:', error);
      if (typeof errorCB === 'function') {
        errorCB(xhr, status, error);
      }
    },
  };
  $.ajax(request);
};

///////////////

export let createSession = function (username, password, successCB, errorCB) {
  let request = {
    type: 'POST',
    url: 'api/sessions',
    data: {
      user: {
        username: username,
        password: password,
      },
    },
    success: function (data) {
      console.log('User created successfully:', data);
      if (typeof successCB === 'function') {
        successCB(data);
      }
    },
    error: function (xhr, status, error) {
      console.error('Error creating user:', error);
      if (typeof errorCB === 'function') {
        errorCB(xhr, status, error);
      }
    },
  };
  $.ajax(request);
};

/////////////////////

export let authenticateUser = function (callback) {
  var request = {
    type: 'GET',
    url: 'api/authenticated',
    success: function (response) {
      callback(response);
    },
  };
  $.ajax(request);
};

///////////////////

export let getCurrentUser = function (callback) {
  authenticateUser(function (response) {
    if (response.authenticated == true) {
      callback(response);
    } else if (response.authenticated == false) {
      window.location.replace('/');
    }
  });
};

/////////////////

export let logout = function (callback) {
  var request = {
    type: 'DELETE',
    url: 'api/sessions',
    success: function (response) {
      callback(response);
    },
  };
  $.ajax(request);
};

//////////////////////////////

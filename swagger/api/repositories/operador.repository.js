'use strict';

var _ = require('lodash');
var shortid = require('shortid');


const Sequelize = require('sequelize');

const sequelize = new 
Sequelize('postgres://oscar:oscar@localhost:5432/registro');
//Sequelize('mysql://adsoft:5i5i5i5i@localhost:3306/er');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Operadores = sequelize.define('usuarios', {
	codigo: {
	  type: Sequelize.INTEGER
	},
	nombre: {
		type: Sequelize.STRING
	},
	apellidop: {
		type: Sequelize.STRING
  },
  apellidom: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
  },
  password: {
		type: Sequelize.STRING
	}
  });
  
////////////////////////////////////////////////////////////////////////////////
// PROPERTIES
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function getOperadores(params) {
   
    return new Promise(function(resolve, reject) {
        Operadores.findAll().then(operadores => {
            resolve(operadores);
       })
      });
}

function getOperadorById(id) {
  return new Promise(function(resolve, reject) {
    Operadores.findById(id).then(operadores => {
      console.log(operadores);
      resolve(operadores);
    })
  })
}


function createOperador(body) {

  console.log('Body %s ', body.nombre);
  
  return new Promise(function(resolve, reject) {
  
    console.log('Body %s ', body.nombre);
    Operadores
     .create({ 
               codigo: body.codigo, 
               nombre: body.nombre, 
               apellidop: body.apellidop,
               apellidom: body.apellidom, 
               email: body.email, 
               password: body.password,

            })
            .then(myoperador => resolve(myoperador))
            .catch(error => resolve(error));
  
    });

}


function deleteOperador(id) {

  var idToSearch = id;

  return new Promise(function(resolve, reject) {
    
  Operadores
    .findById(id)
    .then(myoper => {
      console.log("Result of findById: " + myoper);
      if (!myoper) {
        resolve({});
      }
      return myoper
        .destroy()
        .then(() => resolve(myoper))
        .catch(error => resolve(error));
    })
    .catch(error => {
      console.log("There was an error: " + error);
      resolve(error);
    });

  });
}

function updateOperador(body) {
  return new Promise(function(resolve, reject) {
    Operadores
      .findById(body.id)
      .then(myoper => {
        console.log("Result of findById: " + myoper);
        if (!myoper) {
          resolve({});
        }
        return myoper
          .update({ 
            codigo: body.codigo, 
            nombre: body.nombre, 
            apellidop: body.apellidop,
            apellidom: body.apellidom, 
            email: body.email, 
            password: body.password,
          })
          .then(() => resolve(myoper))
          .catch(error => resolve(error));
      })
      .catch(error => {
        console.log("There was an error: " + error);
        resolve(error);
      });
  });
}

module.exports = {
  getOperadores,
  getOperadorById,
  createOperador,
  updateOperador,
  deleteOperador
}


![M](https://github.com/agustin3a/m/blob/master/logo.png)
=========

Web app monitor.

## Installation

```sh
  $ npm install git://github.com/agustin3a/m.git --save
```
## Configuring

For configuring create a file in root app folder with the name [m.json](https://github.com/agustin3a/m/blob/master/m.json).  
The file have a list of variables for configuring:
+ __name__: Name of your application
+ __target__: IP of the pc running the m client app
+ __port__: Listener port number of pc running the m client app
+ __app_port__: Listener port number  of your application
+ __proxy_port__: Port number for proxy

## Usage

  Add at the begining of your app main file:
```javascript
	require('m');
```

## Release History

* 0.1.0 Initial release
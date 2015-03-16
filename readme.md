# Netflix Controller #
Control your Netflix instance running in Chrome from any device attached to your LAN.

## Setup 

Follow these instructions on your Netflix machine.

### Requirements  

* A machine to run Netflix on
	* Node.js 0.12.0+
	* Google Chrome 40+
	* _(Recommended)_ A static LAN IP
* A remote device connected to your LAN to use as the controller (e.g. smartphone, tablet)
	* A modern, evergreen browser

### Installation 

Get the Chrome extension:

https://chrome.google.com/webstore/detail/netflix-controller/ofhdolemnemaefpickkjhhboccimhkjc

Clone the repository:

```bash
$ git clone https://github.com/nikwhite/netflix-controller.git
```

Install npm packages from the root of the git repo:

```bash
$ npm install 
```

Start the node application from the same directory:

```bash
$ node index
```

This starts a node application. During startup it will print out your LAN IP and the port the application runs on (e.g. `192.168.1.2:8889`). This will be where you point your remote device to control Netflix.

## Usage 

Start Netflix on the host machine with the above installation steps completed. Point your remote device's web browser to the `IP:port` printed out by the node application. Search, browse, play, and enjoy!

## Supported Platforms 

* Mac OS X 10.10
* Windows 7 

Please let me know if you've used this successfully on other platforms.

## TODO

* Fullscreen button
* Fast-forward/rewind
* Season/episode selection

The MIT License (MIT)

Copyright &copy; 2015 Nik White

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

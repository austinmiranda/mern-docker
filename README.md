## MERN Application

First You must have Docker installed on local system

Run Docker Quickstart (First run will download iso image)

In another terminal (or docker terminal) you can run the following commands, for version and info of docker image

the output is displayed

```sh
$ docker version
Client:
 Version:       18.03.0-ce
 API version:   1.37
 Go version:    go1.9.4
 Git commit:    0520e24302
 Built: Fri Mar 23 08:31:36 2018
 OS/Arch:       windows/amd64
 Experimental:  false
 Orchestrator:  swarm

Server: Docker Engine - Community
 Engine:
  Version:      18.09.1
  API version:  1.39 (minimum version 1.12)
  Go version:   go1.10.6
  Git commit:   4c52b90
  Built:        Wed Jan  9 19:41:57 2019
  OS/Arch:      linux/amd64
  Experimental: false

$ docker info
Containers: 4
 Running: 0
 Paused: 0
 Stopped: 4
Images: 4
Server Version: 18.09.1
Storage Driver: overlay2
 Backing Filesystem: extfs
 Supports d_type: true
 Native Overlay Diff: true
Logging Driver: json-file
Cgroup Driver: cgroupfs
Plugins:
 Volume: local
 Network: bridge host macvlan null overlay
 Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
Swarm: inactive
Runtimes: runc
Default Runtime: runc
Init Binary: docker-init
containerd version: 9754871865f7fe2f4e74d43e2fc7ccd237edcbce
runc version: 96ec2177ae841256168fcf76954f7177af9446eb
init version: fec3683
Security Options:
 seccomp
  Profile: default
Kernel Version: 4.14.92-boot2docker
Operating System: Boot2Docker 18.09.1 (TCL 8.2.1)
OSType: linux
Architecture: x86_64
CPUs: 1
Total Memory: 989.4MiB
Name: default
ID: 3MSD:ZZYV:OIKI:RWNG:7VVB:BKB6:JFAS:C4T7:K5LM:TYPZ:6HCG:SKIU
Docker Root Dir: /mnt/sda1/var/lib/docker
Debug Mode (client): false
Debug Mode (server): false
Registry: https://index.docker.io/v1/
Labels:
 provider=virtualbox
Experimental: false
Insecure Registries:
 127.0.0.0/8
Live Restore Enabled: false
```

### Some Other Docker Commands

check if anything is running (-a adds history):
```sh
$ docker ps
$ docker ps -a
```

stop container:
```sh
$ docker container stop 'id'
```

images installed:
```sh
$ docker image ls
```

remove container:
```sh
$ docker container rm 'id'
```

### Test docker is running 
by installing a basic image
```sh
$ docker run hello-world
```
### Building

This step is now as simple as running:

`docker-compose build --force-rm`

The last flag there, the `--force-rm`, instructs docker-compose to go ahead and remove any containers based on the images it is building. This saves us a lot of time compared to manually building the images one by one! You'll also note that docker-compose has a cache - it is capable of seeing when any image has not changed, and will defer building in favour of using the cached version. This can speed up a build tremendously, and is completely automated for us.

### Running

This is equally simple:

`docker-compose up`
This command will launch all the containers necessary for our application, and in short order we can test this by visiting 


Run this url to check if api is running `http://192.168.99.100/api/countries/all`
should return an array of objects

Visit `http://192.168.99.100:3000/` to launch application

Any time we wish to, we can shut down all services by running:

`docker-compose down`

This will shut down all services, and perform cleanup tasks.


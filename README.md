# DoHo
### Manages your local projects

Just one line to start or stop projects from anywhere on your machine.

## Get started

### Installation

```sh
npm i -g doho
```

### Add your first project

To have a `docker-compose` project working, you'll need to set up your projects directory as following.

```sh
# Example project
~/path/to/your/projects/my-project
 |— docker-compose.yaml
```

Then add your project like so:

```sh
doho create my-project docker-compose ~/path/to/your/projects/
```

**optionally** you could first set your default projects path and then add the project:

```sh
# Set the default path to your 
# mainly used projects folder
doho path set ~/path/to/your/projects/

# Add project with default path
doho create my-project docker-compose 
```

### Start and stop your project

```sh
# Start project
doho start my-project

# Stop project
doho stop my-project
```

## Documentation

### clear

#### projects

Clears the list of projects

```sh
doho clear projects
```

<hr>

### path

#### set 

Sets a new default path

```sh
doho path set ~/your/path
```

#### get 

Returns the default path

```sh
doho path get
```

<hr>

### show

#### project 

Shows the passed project

```sh
doho show project my-project
```

## License
[MIT](./LICENSE)

## Contributors
Moritz Gut [:computer:](https://moritzgut.de) — [:octocat:](https://github.com/moritzgvt)
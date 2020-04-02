# DoHo
### Manages your local projects

Just one line to start or stop projects from anywhere on your machine.

## Get started

### Installation

```sh
npm i -g doho
```

### Add your first project

Set up your `docker-compose` project directory, like this:

```
~/path/to/your/projects/my-project
  |— docker-compose.yaml
```

Add your project:

```sh
doho add my-project docker-compose ~/path/to/your/projects/
```

**optionally** you could first set your default projects path and then add the project:

```sh
# Set the default path to your 
# mainly used projects folder
doho set path ~/path/to/your/projects/

# Add project with default path
doho add my-project docker-compose 
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

### set

#### path

Sets a new default path

```sh
doho set path ~/your/path
```

<hr>

### show

#### project

```sh
# Displays the currently 
# active project object
doho show project

# Displays the project object
doho show project my-project

# Displays all project objects
doho show project --all
```

#### path

```sh
# Displays the currently
# active projects path
doho show path

# Displays the project path
doho show path my-project

# Displays the paths of all projects
doho show path --all
```

#### type

```sh
# Displays the currently
# active projects type
doho show type

# Displays the project type
doho show type my-project

# Displays the types of all projects
doho show type --all
```

## License
[MIT](./LICENSE)

## Contributors
Moritz Gut [:computer:](https://moritzgut.de) — [:octocat:](https://github.com/moritzgvt)
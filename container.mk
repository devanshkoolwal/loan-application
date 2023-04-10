PROJECT = loan
IMAGE = $(PROJECT):latest
DOCKER_FILE = Dockerfile

build_image = docker build -t $(IMAGE) -f $(DOCKER_FILE) .

run_image = docker-compose up

docker_compose_down = docker-compose down
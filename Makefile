include container.mk

.PHONY: image
image:
	$(call build_image)

.PHONY: run
run:
	$(call run_image)

.PHONY: stop
stop:
	$(call podman_compose_down)
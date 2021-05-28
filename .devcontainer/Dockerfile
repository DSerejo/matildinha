# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.158.0/containers/debian/.devcontainer/base.Dockerfile

# [Choice] Debian version: buster, stretch

FROM node:14-stretch-slim


# ** [Optional] Uncomment this section to install additional packages. **
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git curl

RUN curl https://cli-assets.heroku.com/install.sh | sh
RUN git config core.sshCommand "ssh -i ssh/id_rsa -F /dev/null"


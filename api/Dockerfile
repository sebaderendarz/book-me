FROM python:3.9-buster as base


ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

ENV PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

# envs set to 'false' because we don't need to create virtualenvs inside a container
ENV POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=false \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1

ENV PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"


FROM base as builder-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        curl \
        build-essential

RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python

WORKDIR $PYSETUP_PATH
# Thanks to poetry.lock copied in the line below dependencies will not be resolved after each
# change in pyproject.toml. It makes a build process significantly faster and we are sure that
# the exactly same versions of dependencies are installed as specified in poetry.lock file.
COPY pyproject.toml poetry.lock ./


# NOTE: Not 100% sure that thanks to this configuration docker image will be fully optimized.
# development version
FROM base as development

ENV RUN_ENV=development

# we must copy from builder-base because we install poetry in this stage
COPY --from=builder-base $POETRY_HOME $POETRY_HOME
COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH
WORKDIR $PYSETUP_PATH
RUN poetry install

WORKDIR /app


# production version
FROM base as production

ENV RUN_ENV=production

COPY --from=builder-base $POETRY_HOME $POETRY_HOME
COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH
WORKDIR $PYSETUP_PATH
RUN poetry install --no-dev
COPY . /app

WORKDIR /app

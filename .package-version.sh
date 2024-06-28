#!/usr/bin/env bash

echo $(git describe --tags --abbrev=0 | tr -d v)+$(git rev-list --count HEAD)

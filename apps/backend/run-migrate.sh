#!/bin/bash
export $(grep -v '^#' .env | xargs)
migrate -path ./src/database/migrations -database "$DATABASE_URL" up
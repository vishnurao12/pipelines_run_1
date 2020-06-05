#!/usr/bin/env bash

CUSTOMER=$1
RABBITMQ_ADMIN_USER=$2
RABBITMQ_ADMIN_PASSWORD=$3
RABBITMQ_ADMIN_URL=$4

function showUsage() {
    echo "Usage: $0 customer_name"
    exit
}

if [ -z "$CUSTOMER" ]; then
    echo "Requires Customer"
    showUsage
    exit 0
fi
if [ -z "$RABBITMQ_ADMIN_USER" ]; then
    echo "Requires RABBITMQ_ADMIN_USER"
    showUsage
    exit 0
fi
if [ -z "$RABBITMQ_ADMIN_PASSWORD" ]; then
    echo "Requires RABBITMQ_ADMIN_PASSWORD"
    showUsage
    exit 0
fi
if [ -z "$RABBITMQ_ADMIN_URL" ]; then
    echo "Requires RABBITMQ_ADMIN_URL"
    showUsage
    exit 0
fi

purge_queue() {
  QUEUE_NAME=$1
  VHOST_NAME="${CUSTOMER}_pipelinesRoot"
  curl -i -u "$RABBITMQ_ADMIN_USER:$RABBITMQ_ADMIN_PASSWORD" -XDELETE "https://$RABBITMQ_ADMIN_URL/api/queues/$VHOST_NAME/$QUEUE_NAME/contents"
}


deletePipelineById for id: 28 returned error: deletePipelineStepById for id: 107 returned error: pipelineSteps.destroy failed for id: 107 returned error: update or delete on table "pipelineSteps" violates foreign key constraint "pipelineSteplets_pipelineStepId_fkey" on table "pipelineSteplets"
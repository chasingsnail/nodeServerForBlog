#!/bin/sh
cd /Users/mac/WebstormProjects/nodeServerForBlog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log

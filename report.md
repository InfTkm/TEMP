# CSC302 A3 Deliverable

## Issues

https://github.com/mozilla/bugbug/issues/1023  
https://github.com/mozilla/code-coverage/issues/97

## Issue 1 - [mozilla/bugbug#1023](https://github.com/mozilla/bugbug/issues/1023)

> Switch images to Python 3.8 #1023  

Mozilla's [bugbug](https://github.com/mozilla/bugbug) is a tool "aims at leveraging machine learning techniques to help with bug and quality management, and other software engineering tasks".  
In this issue, the goal is to bump the Python:3.7 image to Python:3.8. The benefit is apparently keeping things updated and patched. 

### Diagnosis

The file involved is `.taskcluster.yml`. Taskcluster is Mozilla's own CI tool. Basically we specify what docker image to be used and what commands to be run in this config yaml file. The goal is to update the Python:3.7 to Python:3.8, which seemed easy at first.  

#### Step 1

Interestingly, there is already one PR that attempted to close this issue, a long time ago. After getting a preliminary understanding of bugbug and Taskcluster, the logical first step is to examine that PR and identify the failing cause.  

The PR is [linked here](https://github.com/mozilla/bugbug/pull/1056). The author did the most natural thing to do, change 3.7 to 3.8. At first, I thought maybe the docker hub's python 3.8's tag is not 3.8 (maybe 3.8.1)? It turned out there is a docker image python:3.8.

#### Step 2

Next, I examined the CI tool, [Taskcluster's error log](https://tools.taskcluster.net/task-group-inspector/#/NuHByRQUR3ya3-dP97zkhA), and searched the error message online. The search results indicated that the error was produced because of the incompatibility between Python 3.8 and Scipy. Then I tested it again on my local docker container, which worked. It must be the Scipy team has resolved the issue. I am glad.

#### Step 3

Then I started to test all commands that potentially could be run under Python:3.8 on my local container. Some commands failed because TensorFlow does not support Python 3.8 yet, which means we can not update the container to 3.8 because the project depends on TensorFlow.

### Conclusion

It is unfortunate that I cannot fix this issue, but I left a message in the comment section of the issue stating what I have discovered so that future developers can work on it once TensorFlow is updated.

## Issue 2 - [mozilla/code-coverage#97](https://github.com/mozilla/code-coverage/issues/97)

> Explain heuristics used for "uncovered files" in the UI #97

Code-coverage is Mozilla's tool to display a report in a browser visually of existing generated code coverage report files.  
The goal is to add a help box that can show up on hover to explain one filter option in the front end.  
Fix: [Link to PR](https://github.com/mozilla/code-coverage/pull/454).

### Diagnosis

This Mozilla project is relatively small-scale. The issue is somewhat self-contained in only the front-end section. I read and understood the code. The project front end is using Mustache.js, a template system, to render the front end.

### Proposed Solution

Add a question mark nearby the filter completely_uncovered. On hover, show box of explanation.

#### Change to zero_coverage_report.js

This sj file renders the front end that I am about to modify. On line 59, I set the variable needs_explanation to true for the filter, completely_uncovered so that I know exactly which filter to add the question box in the Mustache template.

#### Change to base.html

This is the base template. At line 138 - 146, I wrote code so that the template renders the question box and the explanation paragraph when needs_explanation equals true.

#### Change to style.scss

This is the SASS style sheet for the front end. At the end of this file, I added a block of code to style the question mark and the popup, including transition animation, etc.

### Testing
This is a front end change, so it supposedly does not affect the correctness and logic of the project. What I did is to test it on different sizes of screens and devices using Chrome's developer tool, and made sure it looks good.

### Demo
[YouTube Link](https://youtu.be/xmY6yLb7gu4)  
[Link to PR](https://github.com/mozilla/code-coverage/pull/454)
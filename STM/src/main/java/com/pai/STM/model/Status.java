package com.pai.STM.model;

public enum Status {
    NEW("New task"),
    IN_PROGRESS("Task in progress"),
    DONE("Task Done");

    private final String statusType;

    Status(String statusType){
        this.statusType=statusType;
    }
}

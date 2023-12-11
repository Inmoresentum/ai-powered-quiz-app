package com.example.application.exceptions;

import dev.hilla.exception.EndpointException;

import java.util.Map;

public class QuizNotFoundException extends EndpointException {
    public QuizNotFoundException(Throwable cause) {
        super(cause);
    }

    public QuizNotFoundException(String message) {
        super(message);
    }

    public QuizNotFoundException(String message, Object detail) {
        super(message, detail);
    }

    public QuizNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public QuizNotFoundException(String message, Throwable cause, Object detail) {
        super(message, cause, detail);
    }

    @Override
    public Object getDetail() {
        return super.getDetail();
    }

    @Override
    public Map<String, Object> getSerializationData() {
        return super.getSerializationData();
    }
}

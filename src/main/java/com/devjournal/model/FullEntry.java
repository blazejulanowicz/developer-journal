package com.devjournal.model;

import org.springframework.data.rest.core.config.Projection;

import java.sql.Timestamp;

@Projection(name = "fullDetails", types = {Entry.class})
public interface FullEntry {
    String getContent();
    Timestamp getTimestamp();
    User getUser();
    Project getProject();
}

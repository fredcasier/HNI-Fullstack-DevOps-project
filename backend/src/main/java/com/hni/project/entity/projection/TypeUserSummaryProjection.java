package com.hni.project.entity.projection;

import org.springframework.data.rest.core.config.Projection;

import com.hni.project.entity.TypeUser;

@Projection(name = "typeUserSummary", types = TypeUser.class)
public interface TypeUserSummaryProjection {

    String getTypeName();
}
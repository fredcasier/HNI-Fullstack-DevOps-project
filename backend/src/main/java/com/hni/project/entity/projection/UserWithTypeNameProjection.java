package com.hni.project.entity.projection;

import org.springframework.data.rest.core.config.Projection;

import com.hni.project.entity.User;

@Projection(name = "userWithTypeName", types = User.class)
public interface UserWithTypeNameProjection {

    Long getId();

    String getFirstName();

    String getLastName();

    String getEmail();

    TypeUserSummaryProjection getTypeUser();
}
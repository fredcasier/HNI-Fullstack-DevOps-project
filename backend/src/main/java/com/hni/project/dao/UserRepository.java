package com.hni.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hni.project.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}

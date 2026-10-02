package com.hni.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.hni.project.entity.User;

@CrossOrigin ("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Long> {

}

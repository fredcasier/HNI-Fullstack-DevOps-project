package com.hni.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.hni.project.entity.User;
import com.hni.project.entity.projection.UserWithTypeNameProjection;

@CrossOrigin ("http://localhost:4200")
@RepositoryRestResource(excerptProjection = UserWithTypeNameProjection.class)
public interface UserRepository extends JpaRepository<User, Long> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE `user` SET type_id = :typeUserId WHERE id = :userId", nativeQuery = true)
    int updateTypeUser(@Param("userId") Long userId, @Param("typeUserId") Long typeUserId);
}

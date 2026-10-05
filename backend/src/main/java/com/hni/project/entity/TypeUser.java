package com.hni.project.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity 
@Table (name="type_user")
@Getter 
@Setter 
public class TypeUser {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name="id")
    private long id;

    @Column (name="type_name")
    @NotBlank
    @Size(max = 50)
    private String typeName;

    @OneToMany (mappedBy = "typeUser", cascade = CascadeType.REMOVE)
    private List<User> users;
}

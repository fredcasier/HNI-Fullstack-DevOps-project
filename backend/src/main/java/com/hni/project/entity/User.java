package com.hni.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity 
@Table (name="user")
@Data 
public class User {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name="id")
    private long id;

    @Column (name="first_name")
    @NotBlank
    @Size(max = 50)
    private String firstName;

    @Column (name="last_name")
    @NotBlank
    @Size(max = 50)
    private String lastName;

    @Column (name="email")
    @NotBlank
    @Email
    @Size(max = 50)
    private String email;

    @ManyToOne
    @JoinColumn (name="type_id")
    @NotNull
    private TypeUser typeUser;
}

package com.pai.STM.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountId;
    private String name;
    private String lastName;
    @Column(unique = true)
    private String email;
    @JsonIgnore
    private String password;
    private boolean status;
    @Column(name = "reg_date_time")
    private LocalDateTime registrationDateTime;
    @OneToMany(mappedBy = "assignedAccount", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"assignedAccount"})
    private List<Task> tasks;

    public Account(String name, String lastName, String email, String password) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.status = false;
        this.registrationDateTime = LocalDateTime.now();
    }
}

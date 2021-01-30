package com.pai.STM.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int taskId;
    private String title;
    private String description;
    @Column(name = "add_date")
    private LocalDateTime addDate;
    private Type type;
    @Enumerated(value = EnumType.STRING)
    private Status status;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assigned_account", nullable = false)
    @JsonIgnoreProperties({"tasks"})
    private Account assignedAccount;

    public Task(String title, String description, Type type, Status status) {
        this.title = title;
        this.description = description;
        this.addDate = LocalDateTime.now();
        this.type = type;
        this.status = status;
    }

    public Task(String title, String description, Type type, Status status, Account assignedAccount) {
        this.title = title;
        this.description = description;
        this.addDate = LocalDateTime.now();
        this.type = type;
        this.status = status;
        this.assignedAccount = assignedAccount;
    }
}

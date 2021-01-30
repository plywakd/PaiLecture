package com.pai.STM.repository;

import com.pai.STM.model.Status;
import com.pai.STM.model.Task;
import com.pai.STM.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM tasks ORDER BY add_date DESC")
    List<Task> findAllOrderByDateDesc();

    List<Task> findByTitle(String s);

    List<Task> findByStatus(Status st);

    List<Task> findByType(Type t);
}

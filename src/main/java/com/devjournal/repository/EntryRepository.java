package com.devjournal.repository;

import com.devjournal.model.Entry;
import com.devjournal.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntryRepository extends CrudRepository<Entry, Long> {

    List<Entry> findByUser(User user);
}

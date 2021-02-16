package com.devjournal.repository;

import com.devjournal.model.Entry;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntryRepository extends PagingAndSortingRepository<Entry, Long> {

}

package com.devjournal.repository;

import com.devjournal.model.Entry;
import com.devjournal.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
@PreAuthorize("isFullyAuthenticated()")
public interface EntryRepository extends PagingAndSortingRepository<Entry, Long> {

    @Override
    @PostFilter("filterObject.user.login == principal.username")
    Iterable<Entry> findAll(Sort sort);

    @Override
    @Query("select o from Entry o where o.user.login = ?#{principal.username}")
    Page<Entry> findAll(Pageable pageable);

    @Override
    @Query("select o from Entry o where o.id = ?1 and o.user.login = ?#{principal.username}")
    Optional<Entry> findById(Long aLong);

    @Query("select o from Entry o where o.project in (:projects) and o.user.login = ?#{principal.username}")
    Page<Entry> findByProjectIn(Project[] projects, Pageable pageable);

    @Override
    @RestResource(exported = false)
    boolean existsById(Long aLong);

    @Override
    @PostFilter("filterObject.user.login == principal.username")
    Iterable<Entry> findAll();

    @Override
    @PostFilter("filterObject.user.login == principal.username")
    Iterable<Entry> findAllById(Iterable<Long> longs);

    @Override
    @RestResource(exported = false)
    long count();

    @Override
    @PreAuthorize("@entryRepository.findById(#aLong)?.user.login == principal.username")
    void deleteById(@Param("aLong") Long aLong);

    @Override
    @PreAuthorize("#entity.user.login == principal.username")
    void delete(@Param("entity") Entry entity);

    @Override
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends Entry> entities);

    @Override
    @RestResource(exported = false)
    void deleteAll();
}
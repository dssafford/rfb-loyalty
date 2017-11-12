package com.doug.repository;

import com.doug.domain.RfbEvent;
import com.doug.domain.RfbLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;


/**
 * Spring Data JPA repository for the RfbEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RfbEventRepository extends JpaRepository<RfbEvent, Long> {

    RfbEvent findByRfbLocationAndEventDate(RfbLocation location, LocalDate date);

    RfbEvent findByEventCodeEqualsAndEventDateEqualsAndRfbLocationEquals(String eventCode, LocalDate eventDate, RfbLocation location);

    RfbEvent findByEventDateEqualsAndRfbLocationEquals(LocalDate eventDate, RfbLocation location);
}

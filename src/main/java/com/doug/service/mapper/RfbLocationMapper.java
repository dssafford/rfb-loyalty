package com.doug.service.mapper;

import com.doug.domain.*;
import com.doug.service.dto.RfbLocationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RfbLocation and its DTO RfbLocationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RfbLocationMapper extends EntityMapper<RfbLocationDTO, RfbLocation> {

    

    @Mapping(target = "rvbEvents", ignore = true)
    RfbLocation toEntity(RfbLocationDTO rfbLocationDTO);

    default RfbLocation fromId(Long id) {
        if (id == null) {
            return null;
        }
        RfbLocation rfbLocation = new RfbLocation();
        rfbLocation.setId(id);
        return rfbLocation;
    }
}

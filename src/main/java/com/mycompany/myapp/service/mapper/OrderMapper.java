package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.OrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring", uses = {ClientMapper.class, ProductMapper.class})
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {

    @Mapping(source = "client", target = "client")
    OrderDTO toDto(Order order);


    @Mapping(source = "client", target = "client")
    @Mapping(target = "removeProducts", ignore = true)
    Order toEntity(OrderDTO orderDTO);

    default Order fromId(Long id) {
        if (id == null) {
            return null;
        }
        Order order = new Order();
        order.setId(id);
        return order;
    }

    default OrderDTO.ClientItem clientToClientItem(Client client) {
        if ( client == null ) {
            return null;
        }

        OrderDTO.ClientItem clientItem = new OrderDTO.ClientItem();

        clientItem.setId( client.getId() );
        String abbName = client.getLastName() + " " +
            client.getFirstName().charAt(0) +
            "." +
            client.getMiddleName().charAt(0) +
            ".";
        clientItem.setAbbName(abbName);

        return clientItem;
    }
}

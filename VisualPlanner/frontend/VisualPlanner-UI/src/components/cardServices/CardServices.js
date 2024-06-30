import React, { useState, useEffect, useRef } from "react";
import "./CardService.css";
import { Link } from "react-router-dom";
import { ListItemAvatar } from "@mui/material";

function CardService({ service }) {
 

 


  return (
    <div className="card-service">
      <Link to={`/details/${service.id}`}>
        {service.picture ? (
          <img src={`data:image/png;base64,${service.picture}`} alt={service.serviceName} />
        ) : (
          <p>Се вчитува...</p>
        )}
      </Link>
      <div className="card-details">
        <h3>{service.activityTypeName}</h3>
        <p>
          <label>Опис :</label>
         {service.description}
        </p>
        <p>Поени: {service.price}</p>
        <p className="posted-by">Креирано од: {service.user} </p>
      </div>
    </div>
  );
}


function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>&#8592;</button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>&#8594;</button>
      )}
    </div>
  );
}

function CardServices({
  activityTypes,
  posts,
  currentPage,
  setCurrentPage,
  totalPages,
  activityTypeId,
  refreshPosts,
  handleActivityTypeClick,
}) {
  useEffect(() => {
    refreshPosts(currentPage, activityTypeId);
  }, [currentPage, activityTypeId]);

  return (
    <div className="App">
      <div className="filters">
        <h3>Мои задачи:</h3>
        <p
          className={!activityTypeId ? "active" : ""}
          onClick={() => handleActivityTypeClick(null)}
        >
          Сите
        </p>
        {activityTypes.map((activityType) => (
          <p
            key={activityType.id}
            className={activityTypeId === activityType.id ? "active" : ""}
            onClick={() => handleActivityTypeClick(activityType.id)}
          >
            {activityType.type}
          </p>
        ))}
      </div>
      <div className="services-pagination-container">
        <div className="card-services">
          {posts.length > 0 ? (
            posts.map((service) => (
              <CardService key={service.id} service={service} />
            ))
          ) : (
            <h2 className="card-services-none">Нема активни задачи за оваа категорија.</h2>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default CardServices;

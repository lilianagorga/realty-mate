import React from "react";
import { Box } from "@chakra-ui/react";
import Heading from "../common/Heading";
import { team } from "../../constants/data";
import "../../assets/css/team.css"

const Team = () => {
  return (
    <Box className="background" p={5}>
      <section className='team background'>
        <div className='container'>
          <Heading 
            title='Our Featured Agents' 
            subtitle='Our team of dedicated real estate agents brings you the best of residential 
            and commercial properties, ensuring every transaction is smooth and beneficial.' 
          />

          <div className='content mtop grid3'>
            {team.map((val, index) => (
              <div className='box' key={index}>
                <button className='btn3'>{val.list} Listings</button>
                <div className='details'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <i className='fa-solid fa-circle-check'></i>
                  </div>
                  <i className='fa fa-location-dot'></i>
                  <label>{val.address}</label>
                  <h4>{val.name}</h4>

                  <ul>
                    {val.icon.map((icon, index) => (
                      <li key={index}>{icon}</li>
                    ))}
                  </ul>
                  <div className='btn-container flex'>
                    <button className="btn-message">
                      <i className='fa fa-envelope'></i>
                      Message
                    </button>
                    <button className='btn4'>
                      <i className='fa fa-phone-alt'></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Box>
  )
}

export default Team
import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Image, Heading as ChakraHeading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import Heading from "../common/Heading.jsx";
import { TempCustomContainer as CustomContainer } from "../common/TempCustomContainer.jsx";
// import { CustomContainer } from "../common/CustomContainer.jsx";
import { CustomFlexContainer } from "../common/CustomFlexContainer.jsx";
import { getTeams } from "../../utils/fetchData.js";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsData = await getTeams();

      const transformedTeamsData = teamsData.map(team => ({
        ...team,
        icon: team.icon ? JSON.parse(team.icon).map((iconStr, index) => (
          <span key={index} dangerouslySetInnerHTML={{ __html: iconStr }} />
        )) : []
      }));
      setTeamMembers(transformedTeamsData);
    };
    fetchTeams();
  }, []);

  return (
    <Box p={5} py="20" bg="team.100" position="relative">
      <Box as="section">
        <CustomContainer>
          <Heading 
            title='Our Featured Agents' 
            subtitle='Our team of dedicated real estate agents brings you the best of residential 
            and commercial properties, ensuring every transaction is smooth and beneficial.' 
          />

          <Grid mt={12.5} templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
            {teamMembers.map((val, index) => (
              <Box 
                as="article"
                data-testid={`team-member-${index}`}
                bg="white"
                borderRadius={1.5}
                border="1px solid"
                borderColor="rgba(62, 28, 131, 0.1)"
                p={8}
                transition="all 0.5s ease"
                _hover={{
                  boxShadow: "teamShadow",
                  cursor: "pointer"
                }}
                key={index}
              >
                <Button   
                  bg="team.200"
                  borderRadius="full"
                  color="white"
                  px={8}
                  py={5}
                  fontWeight="bold"
                  fontSize={12}
                  _hover={{ bg: "orange.600" }}
                >
                {val.list} Listings
                </Button>
                <Box textAlign="center" mt={7.5}>
                  <Box position="relative" w="110px" h="110px" m="auto">
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      w="110px"
                      h="110px"
                      m="auto"
                      border="5px solid #edf0f5"
                      borderRadius="full" 
                      zIndex="1"
                      />
                    <Image 
                      src={val.cover} 
                      alt='' 
                      borderRadius="full" 
                      boxSize="85px" 
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      m='auto'
                      zIndex="2"
                    />
                    <Box as={FontAwesomeIcon}
                      icon={faCircleCheck}
                      color="team.300"
                      fontSize="20px"
                      position="absolute"
                      top="50%"
                      right="10px"
                      transform="translateY(-50%) translateX(50%)"  
                      zIndex="3"
                    />
                  </Box>
                  <Box as={FontAwesomeIcon} icon={faMapMarkerAlt} color="team.400" fontSize="20px"></Box>
                  <Text as="label" ml="2" display="inline-block" color="team.400" fontSize="14px">
                    {val.address}
                  </Text>
                  <ChakraHeading as="h4" fontSize='16px' fontWeight="500" mt="10px">
                    {val.name}
                  </ChakraHeading>
                  <UnorderedList styleType="none" display="inline-block" mt="10px">
                    {val.icon.map((icon, index) => (
                      <ListItem 
                        key={index} 
                        display="inline-block" 
                        w="40px" 
                        h="40px" 
                        lineHeight="40px" 
                        alignItems="center" 
                        bg="team.500" 
                        borderRadius="full" 
                        m="5px"
                        data-testid={`icon-${index}`}
                      >
                        <Box as="span">{icon}</Box>
                      </ListItem>
                    ))}
                  </UnorderedList>
                  <CustomFlexContainer
                    p="1rem 0 0"
                    borderRadius="5px"
                    border="none"
                    color="white"
                    cursor="pointer"
                    fontWeight="bold"
                  >
                    <Button variant="message" leftIcon={<FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '5px' }} />}>
                      Message
                    </Button>
                    <Button variant="dark" leftIcon={<FontAwesomeIcon icon={faPhoneAlt} style={{ marginLeft: '5px', color: 'white', fontSize: '20px' }} />}>
                    </Button>
                  </CustomFlexContainer>
                </Box>
              </Box>
            ))}
          </Grid>
        </CustomContainer>
      </Box>
    </Box>
  )
}

export default Team
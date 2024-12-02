import React from "react";
import styled from "styled-components";
import marvelBackground from '../assets/marvel.png';
import { Link } from "react-router-dom";



const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: url(${marvelBackground}) center no-repeat;
  background-size: cover; /* Ajusta a imagem para cobrir o fundo */
  padding: 40px;
  min-height: 100vh;
  color: #fff; /* Torna o texto visível sobre o fundo */
  
  position: relative;
  
`;

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: rgba(244, 224, 200, 0.8);;
  border: 2px solid #000000;
  border-radius: 10px;
  font-family: "Comic Sans MS", sans-serif;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: #d22d2d;
  text-shadow: 2px 2px #000;
  margin-bottom: 15px;
`;

const SubHeader = styled.h2`
  font-size: 1.5rem;
  color: #4a2c2a;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #3a66cc;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const List = styled.ul`
  list-style-type: square;
  padding-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #3a66cc;
  margin-bottom: 5px;
`;

function StaticPage() {
  return (
    <PageWrapper>
    <AboutContainer>
      {/* Introdução */}
      <Section>
        <Header>M2A MINI PROJECT- Marvel Comics</Header>
        <Paragraph>
            Project carried out by Vânia Morais within the scope of UC Technologies and Web Development. GitHub Link: 
            <Link>https://github.com/VaniaMMorais/tdw-mp2-vania-morais</Link>
        </Paragraph>
      </Section>

      {/* Finalidade */}
      <Section>
        <SubHeader>Mission</SubHeader>
        <Paragraph>
        Consume and visualize public information in a dynamic, accessible and intuitive way, using an interface that reflects the theme of the selected data, in this case, Marvel heroes. We intend to explore the potential of public APIs to create an application that facilitates data consumption and promotes user interactivity.
        </Paragraph>
      </Section>

      {/* Ferramentas */}
      <Section>
        <SubHeader>Tools & Technologies</SubHeader>
        <List>
          <ListItem>React for building the interface</ListItem>
          <ListItem>Redux Toolkit for state management.</ListItem>
          <ListItem>RTK query to consume APIs</ListItem>
          <ListItem>Styled Components for styling</ListItem>
          <ListItem>React Router for navigation between pages</ListItem>
        </List>
      </Section>

      {/* API */}
      <Section>
        <SubHeader>Used APIs</SubHeader>
        <Paragraph>
          To feed project data:
        </Paragraph>
        <List>
          <ListItem>
            <strong>Marvel API:</strong> For characters, comics and series
            related.
          </ListItem>
          <ListItem>
            <strong>SuperHeroAPI:</strong> For detailed statistics on
            powers and abilities.
          </ListItem>
        </List>
      </Section>

      {/* Estrutura */}
      <Section>
        <SubHeader>Project Structure</SubHeader>
        <List>
          <ListItem>
            Marvel character listing page
          </ListItem>
          <ListItem>
            Details page for each character with additional statistics and details
          </ListItem>
          <ListItem>
            "Favorites" page with your favorite characters
          </ListItem>
          <ListItem>
            "About" page with information about the project
          </ListItem>
        </List>
      </Section>
    </AboutContainer>
    </PageWrapper>
  );
}

export default StaticPage;

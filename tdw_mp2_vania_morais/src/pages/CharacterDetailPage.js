import React, { useEffect, useState } from "react";
import { useParams , useNavigate, useLocation  } from "react-router-dom";
import { useFetchCharacterByIdQuery } from "../redux/api/apiSlice";
import { searchSuperheroByName } from "../redux/api/superHeroAPI";
import { useFetchComicsByCharacterQuery } from "../redux/api/apiSlice";
import Loading from "../components/Loading";
import styled from "styled-components";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--beige);
  border: 2px solid var(--black);
  border-radius: 10px;
  max-width: 800px;
  margin: 20px auto;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-family: "Comic Sans MS", sans-serif;
  font-size: 1rem;
  color: #fff;
  background-color: #d22d2d;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-shadow: 2px 2px #000;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a71b1b;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const CharacterImage = styled.img`
  width: 250px;
  height: auto;
  border-radius: 8px;
  box-shadow: 5px 5px 0 #4a2c2a;
  border: 3px solid #000;
  margin-right: 20px;
`;

const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-family: "Comic Sans MS", sans-serif;
  font-size: 2rem;
  color: #d22d2d;
  text-shadow: 2px 2px #000;
  margin: 0;
`;

const CharacterDescription = styled.p`
  font-family: "Arial", sans-serif;
  font-size: 1.2rem;
  color: #3a66cc;
  margin-top: 10px;
`;


const PowerStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const PowerStatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f4e0c8;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 3px 3px 0 #4a2c2a;
  font-family: "Comic Sans MS", sans-serif;
  font-size: 1.1rem;
  text-align: center;

  span {
    font-size: 1.5rem;
    color: #d22d2d;
    font-weight: bold;
  }
`;


const ComicsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const ComicCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f4e0c8;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 3px 3px 0 #4a2c2a;
  font-family: "Comic Sans MS", sans-serif;
  font-size: 1.1rem;
  text-align: center;

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  span {
    font-size: 1rem;
    font-weight: bold;
  }
`;


const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f4e0c8;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 3px 3px 0 #4a2c2a;
  font-family: "Comic Sans MS", sans-serif;
  font-size: 1.1rem;
  text-align: center;

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  span {
    font-size: 1rem;
    font-weight: bold;
  }
`;


function CharacterDetailPage() {
  const { id } = useParams(); // Marvel character ID
  const { data, isLoading, isError } = useFetchCharacterByIdQuery(id);
  const [superheroDetails, setSuperheroDetails] = useState(null);
  const [superheroLoading, setSuperheroLoading] = useState(true);
  const { data: comicsData, isLoading: comicsLoading } =
    useFetchComicsByCharacterQuery(id);

  const navigate = useNavigate(); 
  const location = useLocation(); 

  useEffect(() => {
    const fetchSuperheroDetails = async () => {
      try {
        let marvelCharacter = data?.data?.results[0]?.name;
        if (marvelCharacter) {
          marvelCharacter = marvelCharacter.replace(/\s*\(.*?\)\s*/g, "").trim();
          const results = await searchSuperheroByName(marvelCharacter);
          if (results && results.length > 0) {
            setSuperheroDetails(results[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching details from SuperHeroAPI:", error);
      } finally {
        setSuperheroLoading(false);
      }
    };

    if (data?.data?.results[0]?.name) {
      fetchSuperheroDetails();
    }
  }, [data]);

  if (isLoading || superheroLoading || comicsLoading) return <Loading />;
  if (isError) return <p>Erro ao carregar os detalhes da personagem.</p>;

  const character = data?.data?.results[0];

  return (
    <DetailContainer>
      <TopSection>
        <CharacterImage
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <CharacterInfo>
          <Header>{character.name}</Header>
          <CharacterDescription>
            {character.description || "No description available."}
          </CharacterDescription>
        </CharacterInfo>
      </TopSection>


      {/* Stats */}
      {superheroDetails && (
        <>
          <Header>Stats</Header>
          <PowerStats>
            <PowerStatItem>
              <span>{superheroDetails.powerstats.power}</span>
              Power
            </PowerStatItem>
            <PowerStatItem>
              <span>{superheroDetails.powerstats.combat}</span>
              Combat
            </PowerStatItem>
            <PowerStatItem>
              <span>{superheroDetails.powerstats.intelligence}</span>
              Intelligence
            </PowerStatItem>
            <PowerStatItem>
              <span>{superheroDetails.powerstats.speed}</span>
              Speed
            </PowerStatItem>
            <PowerStatItem>
              <span>{superheroDetails.powerstats.strength}</span>
              Strength
            </PowerStatItem>
          </PowerStats>
        </>
      )}

      {/* Comics */}
      {comicsData?.data?.results.length > 0 && (
        <>
          <Header>Comics</Header>
          <ComicsSection>
            {comicsData.data.results.map((comic) => (
              <ComicCard key={comic.id}>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <span>{comic.title}</span>
              </ComicCard>
            ))}
          </ComicsSection>
        </>
      )}

      {/* Series */}
      {character.series.items.length > 0 && (
        <>
          <Header>Series</Header>
          <SectionGrid>
            {character.series.items.map((series, index) => (
              <ItemCard key={index}>
                <span>{series.name}</span>
              </ItemCard>
            ))}
          </SectionGrid>
        </>
      )}
    </DetailContainer>
  );
}

export default CharacterDetailPage;
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import PropTypes from 'prop-types';
import { useGetCryptosQuery } from '../services/cryptoApi';

function showHideSearchField(setSearchTerm, simplified) {
  if (!simplified) {
    return (
      <div className="search-crypto">
        <Input
          placeholder="Search Cryptocurrencies"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  }
  return null;
}

function renderCryptoCard(cryptos) {
  if (cryptos && cryptos.length > 0) {
    return cryptos.map((currency) => (
      <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
        <Link to={`/crypto/${currency.id}`}>
          <Card
            title={`${currency.rank}. ${currency.name}`}
            extra={
              <img className="crypto-image" src={currency.iconUrl} alt="" />
            }
            hoverable
          >
            <p>Price: {millify(currency?.price)} </p>
            <p>Market Cap: {millify(currency?.marketCap)} </p>
            <p>Daily Change: {millify(currency?.change)} % </p>
          </Card>
        </Link>
      </Col>
    ));
  }
  return null;
}

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const coins = cryptosList?.data?.coins;
    const filteredData = coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {showHideSearchField(setSearchTerm, simplified)}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {renderCryptoCard(cryptos)}
      </Row>
    </>
  );
};

export default Cryptocurrencies;

Cryptocurrencies.propTypes = {
  simplified: PropTypes.bool,
};

Cryptocurrencies.defaultProps = {
  simplified: false,
};

/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

dayjs.extend(relativeTime);

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

function getDateComponent(news) {
  if (news && news.datePublished) {
    return <Text>{dayjs(news.datePublished).startOf('ss').fromNow()}</Text>;
  }
  return null;
}

function getNewsCard(cryptoNews) {
  return cryptoNews.value.map((news, i) => (
    <Col key={i} xs={24} sm={12} lg={8}>
      <Card hoverable className="news-card">
        <a href={news.url} target="_blank" rel="noreferrer">
          <div className="news-image-container">
            <Title className="news-title" level={4}>
              {news.name}
            </Title>
            <img
              style={{ maxWidth: '200px', maxHeight: '100px' }}
              src={news?.image?.thumbnail?.contentUrl || demoImage}
              alt="news"
            />
          </div>
          <p>
            {news.description > 100
              ? `${news.description.substring(0, 100)}...`
              : news.description}
          </p>
          <div className="provider-container">
            <div>
              <Avatar
                src={
                  news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                }
                alt="news"
              />
              <Text className="provider-name">{news.provider[0].name} </Text>
              {getDateComponent(news)}
            </div>
          </div>
        </a>
      </Card>
    </Col>
  ));
}

function showHideNewsSearch(simplified, data, setNewsCategory) {
  if (!simplified) {
    return (
      <Col span={24}>
        <Select
          showSearch
          className="select-news"
          placeholder="Select a Crypto"
          optionFilterProp="children"
          onChange={(value) => setNewsCategory(value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="Cryptocurrency">Cryptocurrency</Option>
          {data?.data?.coins?.map((coin) => (
            <Option value={coin.name}>{coin.name}</Option>
          ))}
        </Select>
      </Col>
    );
  }
  return null;
}

const News = ({ simplified }) => {
  const count = simplified ? 6 : 12;
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
  const { data } = useGetCryptosQuery(100);
  if (!cryptoNews?.value) {
    return <div>Loading...</div>;
  }
  return (
    <Row gutter={[24, 24]}>
      {showHideNewsSearch(simplified, data, setNewsCategory)}
      {getNewsCard(cryptoNews)}
    </Row>
  );
};

export default News;

News.propTypes = {
  simplified: PropTypes.bool,
};

News.defaultProps = {
  simplified: false,
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Statistic } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, FileDoneOutlined, HourglassOutlined } from '@ant-design/icons';

const Statistics = () => {
  const [stats, setStats] = useState({});
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div>
      <h2>Dashboard Stats</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Tasks"
              value={stats.totalTasks}
              valueStyle={{ color: '#3f8600' }}
              prefix={<FileDoneOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Completed Tasks"
              value={stats.completedTasks}
              valueStyle={{ color: '#1890ff' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Pending Tasks"
              value={stats.pendingTasks}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Average Remaining Time"
              value={stats.averageRemainingTime}
              suffix="hours"
              valueStyle={{ color: '#cf1322' }}
              prefix={<HourglassOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Average Completion Time"
              value={stats.averageCompletionTime}
              suffix="hours"
              valueStyle={{ color: '#3f8600' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
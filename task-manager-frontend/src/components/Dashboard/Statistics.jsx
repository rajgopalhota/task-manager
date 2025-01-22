import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import React from "react";

const Statistics = ({ stats }) => {
  return (
    <div>
      <h1 className="gradient-text-blue text-3xl font-bold uppercase">Dashboard Stats</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Tasks"
              value={stats.totalTasks}
              valueStyle={{ color: "#3f8600" }}
              prefix={<FileDoneOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Completed Tasks"
              value={stats.completedTasks}
              valueStyle={{ color: "#1890ff" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Pending Tasks"
              value={stats.pendingTasks}
              valueStyle={{ color: "#cf1322" }}
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
              valueStyle={{ color: "#cf1322" }}
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
              valueStyle={{ color: "#3f8600" }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;

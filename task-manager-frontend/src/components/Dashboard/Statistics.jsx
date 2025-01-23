import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Tooltip } from "antd";
import React from "react";

const Statistics = ({ stats }) => {
  return (
    <div className="">
      <h1 className="gradient-text-blue text-3xl font-extrabold uppercase mb-6">
        Dashboard Stats
      </h1>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="rounded-lg shadow-lg relative overflow-hidden"
            bodyStyle={{ paddingTop: "60px" }} // Adjust padding to leave space for the banner
          >
            {/* Dark banner */}
            <div className="bg-gray-800 font-semibold text-lg py-2 absolute top-0 left-0 right-0">
              <span className="gradient-text-lb ml-2">Total Tasks</span>
            </div>
            <div className="p-1 text-center">
              <Tooltip title="Total number of tasks created">
                <Statistic
                  value={stats.totalTasks}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<FileDoneOutlined style={{ fontSize: "36px" }} />}
                />
              </Tooltip>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="rounded-lg shadow-lg relative overflow-hidden"
            bodyStyle={{ paddingTop: "60px" }}
          >
            {/* Dark banner */}
            <div className="bg-gray-800 font-semibold text-lg py-2 absolute top-0 left-0 right-0">
              <span className="gradient-text-lb ml-2">Completed Tasks</span>
            </div>
            <div className="p-1 text-center">
              <Tooltip title="Tasks that have been marked as completed">
                <Statistic
                  value={stats.completedTasks}
                  valueStyle={{ color: "#1890ff" }}
                  prefix={<CheckCircleOutlined style={{ fontSize: "36px" }} />}
                />
              </Tooltip>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="rounded-lg shadow-lg relative overflow-hidden"
            bodyStyle={{ paddingTop: "60px" }}
          >
            {/* Dark banner */}
            <div className="bg-gray-800 font-semibold text-lg py-2 absolute top-0 left-0 right-0">
              <span className="gradient-text-lb ml-2">Pending Tasks</span>
            </div>
            <div className="p-1 text-center">
              <Tooltip title="Tasks yet to be completed">
                <Statistic
                  value={stats.pendingTasks}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<ClockCircleOutlined style={{ fontSize: "36px" }} />}
                />
              </Tooltip>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} justify="center" style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            className="rounded-lg shadow-lg relative overflow-hidden"
            bodyStyle={{ paddingTop: "60px" }}
          >
            {/* Dark banner */}
            <div className="bg-gray-800 font-semibold text-lg py-2 absolute top-0 left-0 right-0">
              <span className="gradient-text-lb ml-2">Average Remaining Time</span>
            </div>
            <div className="p-1 text-center">
              <Tooltip title="Average remaining time for pending tasks to be completed">
                <Statistic
                  value={stats.averageRemainingTime}
                  suffix="hours"
                  valueStyle={{ color: "#faad14" }}
                  prefix={<HourglassOutlined style={{ fontSize: "36px" }} />}
                />
              </Tooltip>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            className="rounded-lg shadow-lg relative overflow-hidden"
            bodyStyle={{ paddingTop: "60px" }}
          >
            {/* Dark banner */}
            <div className="bg-gray-800 font-semibold text-lg py-2 absolute top-0 left-0 right-0">
              <span className="gradient-text-lb ml-2">Average Completion Time</span>
            </div>
            <div className="p-1 text-center">
              <Tooltip title="Average time taken to complete tasks">
                <Statistic
                  value={stats.averageCompletionTime}
                  suffix="hours"
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ClockCircleOutlined style={{ fontSize: "36px" }} />}
                />
              </Tooltip>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;

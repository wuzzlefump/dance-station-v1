"use client";
import React from "react";
import InfoModal from "./InfoModal";
import {
  Table as TTable,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { TLesson } from "../../../../../../typings";

interface Props {
  lessons: TLesson[];
}

function LessonTable({ lessons }: Props) {
  const theme = useTheme(getTheme());

  let nodes: any[] = lessons.map((l) => ({
    id: l._id,
    title: l.title,
    date: l.date,
    subject: l?.dances.map((d) => d.name)?.join(", "),
    description: l.content,
  }));

  const data = { nodes };
  return (
    <div>
      <TTable data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Id</HeaderCell>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Subject</HeaderCell>
                <HeaderCell>Description</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.id}</Cell>
                  <Cell>{item.title}</Cell>
                  <Cell>{item.date}</Cell>
                  <Cell>{item.subject || ""}</Cell>
                  <Cell>
                    <InfoModal title={"Description"}>
                      <p>{item.description}</p>
                    </InfoModal>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </TTable>
    </div>
  );
}

export default LessonTable;

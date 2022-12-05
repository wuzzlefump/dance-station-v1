"use client";
import { TMove } from "../../../../../../typings";
import Link from "next/link";
import React from "react";
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

interface Props {
  moves: TMove[];
}

function MovesTable({ moves }: Props) {
  const theme = useTheme(getTheme());

  let nodes: any[] = moves.map((m) => ({
    id: m.moveType._id,
    title: m.moveType.title,
    level: m.moveType.level,
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
                <HeaderCell>Title</HeaderCell>
                <HeaderCell>Level</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.id}</Cell>
                  <Cell>{item.title}</Cell>
                  <Cell>{item.level}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </TTable>
    </div>
  );
}

export default MovesTable;

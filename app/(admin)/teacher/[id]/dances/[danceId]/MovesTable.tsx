"use client";
import { TMovesType } from "../../../../../../typings";
import Link from "next/link";
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
  moves: TMovesType[];
}

function MovesTable({ moves }: Props) {
  const theme = useTheme(getTheme());

  let nodes: any[] = moves.map((m) => ({
    id: m._id,
    title: m.title,
    level: m.level,
  }));

  const data = { nodes };

  return (
    <div className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center p-20 md:p-44 h-screen mx-3">
      <h1 className="pageHeader"> Moves</h1>
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

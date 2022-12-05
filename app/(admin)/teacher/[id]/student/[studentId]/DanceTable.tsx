"use client";
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
import { urlFor } from "../../../../../../sanity";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { TDance } from "../../../../../../typings";
interface Props {
  dances: TDance[];
}

function DanceTable({ dances }: Props) {
  const theme = useTheme(getTheme());

  let nodes: any[] = dances.map((d) => ({
    id: d.danceType._id,
    title: d.danceType.name,
    image: d.danceType.image,
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
                <HeaderCell>Image</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.id}</Cell>
                  <Cell>{item.title}</Cell>
                  <Cell>
                    <img
                      className="rounded-full h-20 w-20"
                      src={urlFor(item.image).url()!}
                    />
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

export default DanceTable;

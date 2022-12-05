"use client";
import { TConcepts, TConceptsType } from "../../../../../../typings";
import PortableText from "react-portable-text";
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

interface Props {
  concepts: TConcepts[];
}

function ConceptTable({ concepts }: Props) {
  const theme = useTheme(getTheme());

  let nodes: any[] = concepts.map((c) => ({
    id: c._id,
    title: c.conceptType.title,
    level: c.conceptType.level,
    description: c?.conceptType?.description,
  }));

  const data = { nodes };

  return (
    <TTable data={data} theme={theme}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Id</HeaderCell>
              <HeaderCell>Title</HeaderCell>
              <HeaderCell>Level</HeaderCell>
              <HeaderCell>Description</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>{item.id}</Cell>
                <Cell>{item.title}</Cell>
                <Cell>{item.level}</Cell>
                <Cell>
                  <InfoModal title={"Description"}>
                    <PortableText
                      dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                      projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                      content={item?.description ? item.description : []}
                    />
                  </InfoModal>
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </TTable>
  );
}

export default ConceptTable;

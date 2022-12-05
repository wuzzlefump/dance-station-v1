"use client";
import { TConcepts, TConceptsType } from "../../../../../../typings";
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
  concepts: TConceptsType[];
  //   user?: TUser;
  //   lessons?: TLesson[];
}

function ConceptTable({ concepts }: Props) {
  const theme = useTheme(getTheme());

  let nodes: any[] = concepts.map((c) => ({
    id: c._id,
    title: c.title,
    level: c.level,
    description: c.description,
  }));

  const data = { nodes };

  return (
    <div className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center p-20 md:p-44 h-screen mx-3">
      <h1 className="pageHeader"> Concepts</h1>
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
                    <button>Description</button>
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

export default ConceptTable;
